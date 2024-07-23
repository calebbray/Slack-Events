import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ListEventFunctionDefinition = DefineFunction({
  callback_id: "list_events",
  title: "List Events",
  description: "List all events",
  source_file: "functions/list_events.ts",
  output_parameters: {
    properties: {
      Events: Schema.types.array,
    },
  },
});

export default SlackFunction(
  ListEventFunctionDefinition,
  async ({ client }) => {
    const events = await client.apps.datastore.query();

    if (!events.ok) {
      return {
        error: `failed to get items ${events.error}`,
      };
    }

    return {
      outputs: events.items,
    };
  },
);
