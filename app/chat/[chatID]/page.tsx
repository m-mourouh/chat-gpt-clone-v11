import Chat from "@/components/Chat";

type ChatProps = {
  params: {
    chatID: string;
  };
};
export default function ChatPage({ params }: ChatProps) {
  const { chatID } = params;

  return <Chat id={chatID} />;
}
