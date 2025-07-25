
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('meals.db');

export const initDb = async () => {
  await db.withTransactionAsync(async () => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      total_calories REAL
    );`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS foods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      meal_id INTEGER,
      name TEXT,
      calories REAL,
      proteins REAL,
      carbs REAL,
      fats REAL,
      FOREIGN KEY(meal_id) REFERENCES meals(id)
    );`);
  });
};

export const insertMeal = async (date: string, totalCalories: number, foods: any[]) => {
  let mealId: number | undefined;
  await db.withTransactionAsync(async () => {
    await db.runAsync('INSERT INTO meals (date, total_calories) VALUES (?, ?);', [date, totalCalories]);
    const meals = await db.getAllAsync('SELECT last_insert_rowid();') as Array<{ [key: string]: number }>;
    mealId = meals[0]?.['last_insert_rowid()'];
    for (const food of foods) {
      await db.runAsync(
        'INSERT INTO foods (meal_id, name, calories, proteins, carbs, fats) VALUES (?, ?, ?, ?, ?, ?);',
        [mealId, food.name, food.calories, food.proteins, food.carbs, food.fats]
      );
    }
  });
  return mealId;
};

export const getMeals = async () => {
  return await db.getAllAsync('SELECT * FROM meals;');
};

export const getFoodsByMeal = async (mealId: number) => {
  return await db.getAllAsync('SELECT * FROM foods WHERE meal_id = ?;', [mealId]);
};
