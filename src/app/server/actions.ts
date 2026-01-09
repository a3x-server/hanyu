"use server";

import { existsSync, mkdirSync } from "node:fs";

import { Buffer } from "node:buffer";
import path from "node:path";
import prisma from "@/db/db.prisma.js";
import { revalidatePath } from "next/cache";
import { upImages } from "@/services/firebase.config.js";
import { v4 as uuid } from "uuid";
import { writeFile } from "node:fs/promises";

let $NAME = "a3x";

let buffer: Buffer | undefined;

interface Data {
  hanzi: string ;
  pinyin: string ;
  tone?: string | null;
  xinbanya: string ;
  img?: string | URL | null;
  source: string | null;
}

export async function addImage(payload: FormData) {
  const $CATEGORY = payload.get("category") || "a3x";
  const $IMAGE = payload.get("img");
  if (typeof $IMAGE !== "string" && $IMAGE?.name) {
    $NAME = $IMAGE.name.toLowerCase();
  }
  if ($IMAGE === "undefined") {
    return { message: "no image" };
  }

  //. Convertir FormData en Buffer: Archivo cargado en Memoria RAM
  if (typeof $IMAGE !== "string" && $IMAGE?.arrayBuffer) {
    const bytes = await $IMAGE.arrayBuffer();
    buffer = Buffer.from(bytes);
  } else {
    return { message: "Invalid image format" };
  }

  //. Guardar archivo en Carpeta Public
  const newFolder = typeof $CATEGORY === "string" ? $CATEGORY : "a3x";
  const imagePath = `${$CATEGORY}-${Date.now()}-formTask-${$NAME}`;
  const newPath = path.join(process.cwd(), "public", "formHanyu", newFolder);

  //! save at local in DEV
  if (process.env.NODE_ENV === "development") {
    if (!existsSync(newPath)) {
      mkdirSync(newPath, { recursive: true });
    }
    const localFilePath = path.join(newPath, imagePath);
    if (buffer) {
      await writeFile(localFilePath, buffer);
    }
  }

  try {
    //. Subir al Bucket Firebase
    if (!buffer) {
      return { message: "Buffer is undefined" };
    }
    const imageURL = await upImages(buffer, imagePath);
    console.log(imageURL);
    return { message: imageURL };
  } catch (error) {
    console.error(error);
    return { message: "Error uploading image" };
  }
}

//! Hanyu
export async function addHanyu(payload: Data) {
  const { hanzi, pinyin, tone, xinbanya, img, source } = payload;
  const id = uuid();
  try {
    const HANYU = await prisma.hanyu.create({
      data: {
        id,
        hanzi,
        pinyin,
        tone,
        xinbanya,
        img: img ? img.toString() : null,
        source,
      },
    }) ;
    revalidatePath("/");
    return HANYU;
  } catch (error) {
    console.error(error);
  }
}

export async function getHanyu() {
  const HANYU = await prisma.hanyu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return HANYU;
}

export async function eraserButton(target: string) {
  await prisma.hanyu.delete({
    where: {
      id: `${target}`,
    },
  });
  revalidatePath("/");
  return { message: "Target Erased" };
}
