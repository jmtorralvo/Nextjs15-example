import fs from 'node:fs';

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  // Added to simulate dealy
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  // Added to simulate dealy
  await new Promise((resolve) => setTimeout(resolve, 1300));
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`)
  const bufferedImage = await meal.image.arrayBuffer();
  
  stream.write(Buffer.from(bufferedImage), error => {
    if (error) {
      throw new Error(`Saving image failed due to: ${error}`);
    }
    stream.end();
  });

  meal.image = `/images/${filename}`;

  db.prepare(`
    INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug)
    VALUES (
        @title,
        @summary,
        @instructions,
        @image,
        @creator,
        @creator_email,
        @slug
         )
  `).run(meal);
}
