import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateEventFunctionDefinition } from "../functions/create_event.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 *
 * This workflow uses interactivity. Learn more at:
 * https://api.slack.com/automation/forms#add-interactivity
 */
const SampleWorkflow = DefineWorkflow({
  callback_id: "sample_workflow",
  title: "Sample workflow",
  description: "A sample workflow",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
      // title: {
      //   type: Schema.types.string,
      // },
      // description: {
      //   type: Schema.types.string,
      // },
      // time: {
      //   type: Schema.types.string,
      // },
    },
    required: ["interactivity", "channel", "user"],
  },
});

/**
 * For collecting input from users, we recommend the
 * OpenForm Slack function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = SampleWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Schedule an event",
  // description: SampleWorkflow.inputs.description,
  // time: SampleWorkflow.inputs.time,
  interactivity: SampleWorkflow.inputs.interactivity,
  submit_label: "Send message",
  fields: {
    elements: [
      {
        name: "title",
        title: "title",
        type: Schema.types.string,
        //default: SampleWorkflow.inputs.title,
      },
      {
        name: "description",
        title: "description",
        type: Schema.types.string,
        //default: SampleWorkflow.inputs.description,
      },
      {
        name: "time",
        title: "time",
        type: Schema.types.string,
        //default: SampleWorkflow.inputs.time,
      },
    ],
    required: ["title", "description", "time"],
  },
});

/**
 * Custom functions are reusable building blocks
 * of automation deployed to Slack infrastructure. They
 * accept inputs, perform calculations, and provide
 * outputs, just like typical programmatic functions.
 * https://api.slack.com/automation/functions/custom
 */
const sampleFunctionStep = SampleWorkflow.addStep(
  CreateEventFunctionDefinition,
  {
    title: inputForm.outputs.fields.title,
    description: inputForm.outputs.fields.description,
    time: inputForm.outputs.fields.time,
  },
);

/**
 * SendMessage is a Slack function. These are
 * Slack-native actions, like creating a channel or sending
 * a message and can be used alongside custom functions in a workflow.
 * https://api.slack.com/automation/functions
 */
// SampleWorkflow.addStep(Schema.slack.functions.SendMessage, {
//   channel_id: inputForm.outputs.fields.channel,
//   message: sampleFunctionStep.outputs.updatedMsg,
// });

export default SampleWorkflow;
