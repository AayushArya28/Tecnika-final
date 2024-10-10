import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/firebaseImageCache';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const useFirebaseImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchImageUrl = async () => {
      if (!imagePath) {
        if (isMounted) {
          setLoading(false);
          setError(new Error('No image path provided'));
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);
        const url = await getImageUrl(imagePath, () => getDownloadURL(imageRef));
        if (isMounted) {
          setImageUrl(url);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchImageUrl();

    return () => {
      isMounted = false;
    };
  }, [imagePath]);

  return { imageUrl, loading, error };
};
