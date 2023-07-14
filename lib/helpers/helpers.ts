
const generateChatId = () => {
  return (
    Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(
      32
    ) + Date.now().toString(32)
  );
};

function findImagesFromLinks(links: string[]): string[] {
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
  const imageUrls: string[] = [];

  for (const link of links) {
    for (const ext of imageExtensions) {
        if (link.endsWith(ext) && !imageUrls.includes(link)) {
          imageUrls.push(link)
        }
    }
  }

  return imageUrls;
}

export { generateChatId, findImagesFromLinks };
