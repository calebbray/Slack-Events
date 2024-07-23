import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Datastores are a Slack-hosted location to store
 * and retrieve data for your app.
 * https://api.slack.com/automation/datastores
 */
const EventsDatastore = DefineDatastore({
  name: "EventsDatastore",
  primary_key: "object_id",
  attributes: {
    orgin_channel: {
      type: Schema.slack.types.channel_id,
    },
    object_id: {
      type: Schema.types.string,
    },
    title: {
      type: Schema.types.string,
    },
    description: {
      type: Schema.types.string,
    },
    time: {
      type: Schema.types.string,
    },
    // rsvps: {
    //   type: Schema.types.array,
    //   items: {
    //     type: Schema.slack.types.user_id,
    //   },
    //   default: [],
    // },
  },
});

export default EventsDatastore;
