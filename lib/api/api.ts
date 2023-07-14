type Question = {
        question: string
};
const sendMessage = async (data: Question) => {
    try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const apiData = await res.json();
        return apiData;
    } catch (error) {
      console.error(error);
    }
};

export { sendMessage };
