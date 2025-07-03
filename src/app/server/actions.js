"use server";
import prisma from "@/db/db.prisma.js";
import { Buffer } from "node:buffer";
import { writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { SubirFiles } from "@/services/firebase.config";

//TODO: Seguridad en las Cookies

//! Products
export async function addImage(payload) {
  const CATEGORY = payload.get("category") || "trifaxic-13";
  const IMAGE = payload.get("img");
  const { name } = IMAGE;
  const NAME = name?.toLowerCase();
  if (IMAGE === "undefined") {
    return { message: "no image" };
  }

  //. Convertir FormData en Buffer: Archivo cargado en Memoria RAM
  const bytes = await IMAGE.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //. Guardar archivo en Carpeta Public
  const newFolder = CATEGORY;
  const imagePath = `${CATEGORY}-${new Date().getTime()}-tr1f4x1c-${NAME}`;
  const newPath = path.join(process.cwd(), "public", "repo", newFolder);

  //! save at local in DEV
  if (process.env.NODE_ENV === "development") {
    if (!existsSync(newPath)) {
      mkdirSync(newPath, { recursive: true });
    }
    const localFilePath = path.join(newPath, imagePath);
    await writeFile(localFilePath, buffer);
  }

  //TODO: hacer function separada a firebase: 02-11-24
  try {
    //. Subir al Bucket Firebase
    const imageURL = await SubirFiles(buffer, NAME);
    console.log(imageURL);
    if (!imageURL) {
      return { message: filePath, localFilePath };
    }
    return { message: imageURL };
  } catch (error) {
    console.log(error);
  }
}

//! Auth - User

export async function Login(payload) {
  const cookieStore = cookies();
  const { email, password } = payload;
  const Session = await prisma.auth.findUnique({
    where: {
      email: email,
    },
  });

  if (!Session) return { error: " User y/o password" };

  try {
    if (compareSync(password, Session?.hashPass)) {
      const { nickname, email, role, img } = Session;
      //TODO: NODE ENV SECRET
      const Signed = sign({ nickname, email, role, img }, "SECRET");
      cookieStore.set("x-token", Signed);
      return { message: "Cookies" };
    } else {
      return { error: " User y/o password" };
    }
  } catch (error) {
    return { error: " User y/o password" || error };
  }
}

//TODO <!--  Session -->
export async function Profile() {
  const getCookie = cookies().get("x-token");
  if (!getCookie) return;
  const token = getCookie?.value?.slice(8);
  const Session = verify(token, "SECRET");
  console.log(Session);
  return { Session };
}

//TODO: Logout
export async function Logout() {
  const cookieStore = cookies();
  cookieStore.delete("x-token");
  revalidatePath("/login");
  return { message: " isLogout" };
}

//! Newsletter

export async function addList(data) {
  try {
    const { fullname, email, tel, message, source } = data;
    const newLeak = await prisma.Newsletters.create({
      data: {
        fullname,
        email,
        tel,
        message,
        source,
      },
    });
    if (!newLeak) return;
    return { message: "Done" };
  } catch (error) {
    console.log(error);
  }
  return;
}

export async function getLists() {
  const LISTS = await prisma.Newsletters.findMany();
  return LISTS;
}

//! Hanyu
export async function addHanyu(payload) {
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
        img,
        source,
      },
    });
    revalidatePath("/hanyu");
    return HANYU;
  } catch (error) {
    console.error(error);
  }
}

export async function getHanyu() {
  const HANYU = await prisma.Hanyu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return HANYU;
}

export async function eraserButton(target) {
  await prisma.hanyu.delete({
    where: {
      id: `${target}`,
    },
  });
  revalidatePath("/hanyu");
  return { message: "Target Erased" };
}
