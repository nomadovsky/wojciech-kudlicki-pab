import { RequestHandler } from "express";
import { isNullOrUndefined } from "util";
import { readTagsFromFile, updateTagsFromFile } from "../fileOperations";
import { Tag } from "../models/tag";

const TAGS_PATH = "data/tags.json";

export const getTag: RequestHandler = async (req, res, next) => {
  const tags = await readTagsFromFile(TAGS_PATH);
  const tag = tags.find((n) => n.id === +req.params.id);
  const tagJSON = JSON.stringify(tag);
  if (tag) res.status(200).send(`200 ${tagJSON}`);
  else res.sendStatus(404);
};

export const getAllTags: RequestHandler = async (req, res, next) => {
  const tags = await readTagsFromFile(TAGS_PATH);
  res.status(200) ? res.send(tags) : res.sendStatus(400);
};

export const addTag = async (tag: Tag) => {
  if (tag.name === undefined) return;
  const tags = await readTagsFromFile(TAGS_PATH);
  if (tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase())) {
    return;
  } else {
    const newTag: Tag = {
      id: tag.id ?? Date.now(),
      name: tag.name,
    };
    await updateTagsFromFile(TAGS_PATH, [...tags, newTag]);
    return newTag;
  }
};

export const createTags: RequestHandler = async (req, res, next) => {
  const newTag = await addTag(req.body);

  if (newTag && res.status(201)) {
    res.send(`201 Tag ID: ${newTag.id}`);
  } else res.sendStatus(400);
};

const updatedTag = (tag: Tag, tagId: number) => {
  const newTag: Tag = {
    id: tagId,
    name: tag.name,
  };
  return newTag;
};

export const updateTags: RequestHandler = async (req, res) => {
  const tags = await readTagsFromFile(TAGS_PATH);

  const index = +req.params.id;
  const tagIndex: number = tags.findIndex((n) => n.id === index);
  if (tagIndex !== -1) {
    tags[tagIndex] = updatedTag(req.body, index);
    res.sendStatus(201);
  } else res.sendStatus(404);
};

export const deleteTag: RequestHandler = async (req, res) => {
  const tags = await readTagsFromFile(TAGS_PATH);

  const tag = tags.find((n: Tag) => n.id === +req.params.id);
  if (tag) {
    const newTags = tags.filter((n: Tag) => n.id !== +req.params.id);
    updateTagsFromFile("./data/tags.json", newTags);
    res.sendStatus(204);
  } else res.sendStatus(400);
};
