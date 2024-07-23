import { Manifest } from "deno-slack-sdk/mod.ts";
import SampleWorkflow from "./workflows/sample_workflow.ts";
import EventsDatastore from "./datastores/events.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "event-bot",
  description: "A template for building Slack apps with Deno",
  icon: "assets/slack_bot_logo.png",
  workflows: [SampleWorkflow],
  outgoingDomains: [],
  datastores: [EventsDatastore],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
    "app_mentions:read",
  ],
});
