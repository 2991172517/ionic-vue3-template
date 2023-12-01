import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  dataUrl: string;
  code: string;
}

const photos = ref<UserPhoto[]>([]);

export function usePhotoGallery() {
  //调用相机Camera.getPhoto
  const takePhoto = async (code: string) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    const sameCodeList = photos.value.filter((item) =>
      item.filepath.includes(code)
    );
    const fileName = code + "-" + (sameCodeList.length + 1) + ".jpg";
    console.log("照片名字", fileName);

    //拍完后保存刚拍的photo
    //传入刚拍的照片和文件名，返回{filepath，webviewPath}对象
    const savedFileImage = await savePicture(photo, fileName, code);
    //更新
    photos.value = [savedFileImage, ...photos.value];
  };
  return {
    takePhoto,
    photos,
  };
}

const savePicture = async (
  photo: Photo,
  fileName: string,
  code: string
): Promise<UserPhoto> => {
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    // data: base64Data,
    data: photo.dataUrl!,
    //写到手机里
    directory: Directory.Documents,
  });

  console.log("保存文件", savedFile);

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: savedFile.uri,
    dataUrl: photo.dataUrl!,
    code,
  };
};

// //将blob格式图片转换为dataUrl(base64)
// const convertBlobToBase64 = (blob: Blob) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onerror = reject;
//     reader.readAsDataURL(blob); //读取完成后会触发onload
//     reader.onload = () => {
//       resolve(reader.result);
//       // console.log(reader.result);
//     };
//   });

// const PHOTO_STORAGE = "photos";
// // 缓存图片在Preferences中，与localStorage类似
// const cachePhotos = () => {
//   Preferences.set({
//     key: PHOTO_STORAGE,
//     value: JSON.stringify(photos.value),
//   });
// };

// //检测photos，一旦改变就缓存所有图片
// watch(photos, cachePhotos);

// //重进tab1的时候加载图片
// const loadSaved = async () => {
//   const photoList = await Preferences.get({ key: PHOTO_STORAGE });
//   const photosInPreferences = photoList.value
//     ? JSON.parse(photoList.value)
//     : [];

//   for (const photo of photosInPreferences) {
//     const file = await Filesystem.readFile({
//       path: photo.filepath,
//       directory: Directory.Data,
//     });
//     photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
//     // photo.webviewPath = file.data;
//   }

//   photos.value = photosInPreferences;
// };

//可以从系统选照片
export function usePickImages() {
  const pickImages = async () => {
    const photoGallery = await Camera.pickImages({
      quality: 80,
      width: 100,
      height: 100,
    });
    console.log(photoGallery);
  };
  return {
    pickImages,
  };
}
