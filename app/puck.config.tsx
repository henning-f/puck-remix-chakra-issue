import { Button } from "@chakra-ui/react";
import {Config} from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  ChakraButton: { text: string };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    ChakraButton: {
      fields: {
        text: { type: "text" },
      },
      defaultProps: {
        text: "Buttontext",
      },
      render: ({ text }) => (
          <Button colorScheme={"teal"}>{text}</Button>
      ),
    },
  },
};

export default config;
