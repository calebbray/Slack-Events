import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const CreateEventFunctionDefinition = DefineFunction({
  callback_id: "create_event",
  title: "Create Event",
  description: "Create an event",
  source_file: "functions/create_event.ts",
  input_parameters: {
    properties: {
      title: {
        type: Schema.types.string,
        description: "Title for your event",
      },
      description: {
        type: Schema.slack.types.user_id,
        description: "Description of your event",
      },
      time: {
        type: Schema.types.string,
        description: "Time of your event",
      },
    },
    required: ["title", "description", "time"],
  },
  output_parameters: {
    properties: {
      object_id: {
        type: Schema.types.string,
        description: "Id of object",
      },
      title: {
        type: Schema.types.string,
        description: "Title for your event",
      },
      description: {
        type: Schema.slack.types.user_id,
        description: "Description of your event",
      },
      time: {
        type: Schema.types.string,
        description: "Time of your event",
      },
      // rsvps: {
      //   type: Schema.types.array,
      //   items: {
      //     type: Schema.slack.user_id,
      //   },
      //   description: "Array of RSVP",
      // },
    },
    required: ["title", "description", "time"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  CreateEventFunctionDefinition,
  async ({ inputs, client }) => {
    const uuid = crypto.randomUUID();

    // Save the sample object to the datastore
    // https://api.slack.com/automation/datastores
    const putResponse = await client.apps.datastore.put({
      datastore: "events",
      item: {
        object_id: uuid,
        title: inputs.title,
        description: inputs.description,
        time: inputs.time,
      },
    });

    if (!putResponse.ok) {
      return {
        error: `Failed to put item into the datastore: ${putResponse.error}`,
      };
    }

    return { outputs: putResponse.item };
  },
);
