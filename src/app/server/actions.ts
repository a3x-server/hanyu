"use server"

import { existsSync, mkdirSync } from "node:fs"

import { Buffer } from "node:buffer"
import path from "node:path"
import prisma from "@/db/db.prisma.js"
import { revalidatePath } from "next/cache"
import { upImages } from "@/services/firebase.config.js"
import { v4 as uuid } from "uuid"
import { writeFile } from "node:fs/promises"
import { HanyuItem } from "@/types/define.d"
import { put } from '@vercel/blob'

let $NAME = "a3x"

let buffer: Buffer | undefined

// Definimos la estructura de retorno estricta para el componente que consuma la función
interface ImageUploadResponse {
  message: string;
}

export async function addImage(payload: FormData): Promise<ImageUploadResponse> {
  // payload.get() devuelve FormDataEntryValue (string | File) o null. Aseguramos que sea string.
  const categoryEntry = payload.get('category');
  const $CATEGORY = typeof categoryEntry === 'string' ? categoryEntry : 'tx13';

  const $IMAGE = payload.get('img');

  // Validamos que el archivo exista, que no sea un string de error y que sea efectivamente un objeto File
  if (!$IMAGE || $IMAGE === 'undefined' || !($IMAGE instanceof File)) {
    return { message: 'no image' };
  }

  // Ahora TypeScript sabe con 100% de certeza que $IMAGE es un objeto de tipo File
  const name: string = $IMAGE.name;
  const NAME: string = name.toLowerCase();

  // Convertir FormData en Buffer: Archivo cargado en Memoria RAM
  const bytes: ArrayBuffer = await $IMAGE.arrayBuffer();
  const buffer: Buffer = Buffer.from(bytes);

  // Configurar rutas y nombres
  const newFolder: string = $CATEGORY;
  const imagePath: string = `${$CATEGORY}-${new Date().getTime()}-tx13z-${NAME}`;
  const newPath: string = path.join(process.cwd(), 'public', 'repo', newFolder);

  //! Guardar archivo local en DEV
  if (process.env.NODE_ENV === 'development') {
    if (!existsSync(newPath)) {
      mkdirSync(newPath, { recursive: true });
    }
    const localFilePath: string = path.join(newPath, imagePath);
    await writeFile(localFilePath, buffer);
  }
  console.log('imagePath', imagePath);

  // Subir a Vercel Blob
  try {
    const blob = await put(`hanyu/${imagePath}`, buffer, {
      access: 'public',
      addRandomSuffix: false,
      oidcToken: process.env.VERCEL_OIDC_TOKEN,
      storeId: process.env.BLOB_STORE_ID
    });

    console.log('Subido con éxito:', blob.url);

    if (!blob.url) {
      return { message: 'error al obtener URL del blob' };
    }

    // Retornamos la URL CDN pública que provee Vercel
    return { message: blob.url };

  } catch (error) {
    console.error('Error subiendo a VB:', error);
    return { message: 'error en la subida' };
  }
}


//! Hanyu
export async function addHanyu(payload: HanyuItem) {
  const { hanzi, pinyin, riyu, tone, xinbanya, img, source } = payload
  console.log(payload)
  const id = uuid()

  try {
    const HANYU = await prisma.hanyu.create({
      data: {
        id,
        hanzi,
        pinyin,
        riyu: riyu ?? null,
        tone,
        xinbanya,
        img: img ? img.toString() : null,
        source,
      },
    })

    if (!HANYU) {
      throw new Error("No se pudo guardar el registro en la base de datos")
    }

    return { message: "Item creado con éxito" }

  } catch (error) {
    console.error(error)
    throw new Error("No se pudo guardar el registro en la base de datos")
  }
}

export async function getHanyu() {
  const HANYU = await prisma.hanyu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return HANYU
}

export async function eraserButton(target: string) {
  await prisma.hanyu.delete({
    where: {
      id: `${target}`,
    },
  })
  revalidatePath("/")
  return { message: "Target Erased" }
}
