import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const ListWorkflow = DefineWorkflow({
  callback_id: "list_events",
  title: "event lister",
  description: "lists all events",
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
    },
    required: ["interactivity", "channel", "user"],
  },
});

const inputForm = ListWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "List out all events",
  // description: SampleWorkflow.inputs.description,
  // time: SampleWorkflow.inputs.time,
  interactivity: ListWorkflow.inputs.interactivity,
  submit_label: "Show events",
  fields: {
    elements: [
      {
        name: "channel",
        title: "sending here",
        type: Schema.slack.types.channel_id,
        default: ListWorkflow.inputs.channel,
      },
    ],
  },
});

// const listEventFunctionStep = ListWorkflow.addStep(
//   ListEventFunctionDefinition,
//   {},
// );
//
//

ListWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: `The scheduled events are:
    *App Dev Picnic*
      A Picnic at the park
      Today
      0 RSVP
    *Hack Day*
      Time for the strugglebus
      Today
      0 RSVP
    *A Test Event*
      Testing creating an event
      Right Now
      1 RSVP
`,
});

export default ListWorkflow;
