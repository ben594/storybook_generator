require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// use this function to get the first completion from the keywords
async function getCompletion(prompt, model = "gpt-3.5-turbo") {
  const messages = [{ "role": "user", "content": prompt }];
  const response = await openai.createChatCompletion({
    model: model,
    messages: messages,
    temperature: 0, // this is the degree of randomness of the model's output
  });
  return response.data.choices[0].message;
}

async function getCompletionFromMessages(messages, model = "gpt-3.5-turbo") {
  const response = await openai.createChatCompletion({
    model: model,
    messages: messages,
    temperature: 1.5,
  });
  return response.data.choices[0].message;
}

function getContentFromMessage(message) {
  const length = message.length;
  return message[length - 1]["content"];
}

// user's initial input
let keywords = "";

// user's option
let user_input = "";

// the prompt for the user to fill in
let prompt = `
You are an interactive story creator and you are going to create \
a story of proper length based on the keywords. You are first going \
to create a part of the story provide the reader with three options \
to let them choose choose how the story continues. Please use this format after the story is generated:

Option 1: ...
Option 2: ...
Option 3: ...

Keywords:
${keywords}
`;

// the prompt for the user to fill in and the story will continue to generate
let continue_prompt = `
${user_input}

Please continue the story with the provided option. Do not display the option at the beginning, just display the story.
`;

// the prompt for the user to fill in and the story will end
let end_prompt = `
${user_input}

Please end the story after this choice with a smooth ending. Display [END] at the end of the story. Do not display the option at the beginning, just display the story. 

`;

(async () => {
  // initial message
  let messages = await getCompletion(prompt);

  // the response
  let response = await getCompletionFromMessages(messages, "gpt-3.5-turbo");

  // need to create a list of messages to pass to the model
  let temp_message = { "role": "user", "content": continue_prompt };
  messages.push(temp_message);

  // pass the messages to the model
  response = await getCompletionFromMessages(messages, "gpt-3.5-turbo");

  console.log(response);
})();
