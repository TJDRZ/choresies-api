import { Request, Response } from "express";
import { client } from "../dbConfig/db.js";

const getChores = async (req: Request, res: Response) => {
  try {
    const person = req.params.person;
    const chores = await client.query(
      `SELECT * FROM chores WHERE person = '${person}';`
    );
    res.status(200).json(chores.rows);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: "Chore not found", error: err.message });
    }
  }
};

const createChore = async (req: Request, res: Response) => {
  try {
    const { _id, name, index, date, timer } = req.body.item;
    const { person } = req.body;
    await client.query(
      `INSERT INTO chores (_id, name, index, date, timer, person) VALUES ('${_id}', '${name}', '${index}', '${date}', '${timer}', '${person._id}');`
    );
    res.status(201).json({ message: "Chore added successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(400)
        .json({ message: "Failed to add chore", error: err.message });
    }
  }
};

const updateName = async (req: Request, res: Response) => {
  try {
    const { _id, name } = req.body.item;
    const { person } = req.body;
    await client.query(
      `UPDATE chores SET name = '${name}' WHERE _id = '${_id}' AND person = '${person._id}';`
    );
    res.status(200).json({
      message: "Chore's name updated successfully",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: "Failed to update chore's name",
        error: err.message,
      });
    }
  }
};

const updateIndex = async (req: Request, res: Response) => {
  try {
    const { _id, index } = req.body.item;
    const { person } = req.body;
    await client.query(
      `UPDATE chores SET index = '${index}' WHERE _id = '${_id}' AND person = '${person._id}';`
    );
    res.status(200).json({
      message: "Chore's index updated successfully",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: "Failed to update chore's index",
        error: err.message,
      });
    }
  }
};

const updateDate = async (req: Request, res: Response) => {
  try {
    const { _id, date } = req.body.item;
    const { person } = req.body;
    await client.query(
      `UPDATE chores SET date = '${date}' WHERE _id = '${_id}' AND person = '${person._id}';`
    );
    res.status(200).json({
      message: "Chore's date updated successfully",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: "Failed to update chore's date",
        error: err.message,
      });
    }
  }
};

const updateTimer = async (req: Request, res: Response) => {
  try {
    const { _id, timer } = req.body.item;
    const { person } = req.body;
    await client.query(
      `UPDATE chores SET timer = '${timer}' WHERE _id = '${_id}' AND person = '${person._id}';`
    );
    res.status(200).json({
      message: "Chore's timer updated successfully",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: "Failed to update chore's timer",
        error: err.message,
      });
    }
  }
};

const deleteChore = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.item;
    const { person } = req.body;
    await client.query(
      `DELETE FROM chores WHERE _id = '${_id}' AND person = '${person._id}';`
    );
    res.status(200).json({ message: "Chore deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: "Chore not found", error: err.message });
    }
  }
};

export {
  getChores,
  createChore,
  updateName,
  updateIndex,
  updateDate,
  updateTimer,
  deleteChore,
};
