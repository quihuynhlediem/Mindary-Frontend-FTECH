const loadEmojiIcons = async (paths: string[]): Promise<HTMLImageElement[]> => {
  return await Promise.all(
    paths.map((path) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    })
  );
};

export default loadEmojiIcons;