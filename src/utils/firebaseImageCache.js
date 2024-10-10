const imageUrlCache = new Map();

export const getImageUrl = async (imagePath, getDownloadURL) => {
  if (imageUrlCache.has(imagePath)) {
    return imageUrlCache.get(imagePath);
  }

  try {
    const url = await getDownloadURL(imagePath);
    imageUrlCache.set(imagePath, url);
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    throw error;
  }
};
