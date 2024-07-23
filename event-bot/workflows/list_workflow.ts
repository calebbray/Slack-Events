import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ListEventFunctionDefinition } from "../functions/list_events.ts";

const ListWorkflow = DefineWorkflow({
  callback_id: "list_events",
  title: "event lister",
  description: "lists all events",
});

const listEventFunctionStep = ListWorkflow.addStep(
  ListEventFunctionDefinition,
  {},
);

ListWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C07E2J11P25",
  message: listEventFunctionStep.outputs.Events,
});

export default ListWorkflow;
