import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import CameraRoll from "@react-native-community/cameraroll";
import { Filter, FilterImage } from "react-native-filter-kit";
import { request, PERMISSIONS } from "react-native-permissions";
import { useSelector, useDispatch } from "react-redux";

const FilterScreen = () => {
  const imageUri = useSelector((state) => state.image);
  const filterValue = useSelector((state) => state.slider);
  const dispatch = useDispatch();
  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result !== "granted") {
      alert("Permission not granted");
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const cameraRef = useRef(null);

  const handleSliderChange = (value) => {
    dispatch({ type: "SLIDEVALUE", values: value });
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      dispatch({ type: "IMAGE", values: data.uri });
    }
  };
  const saveImageToCameraRoll = async () => {
    if (imageUri) {
      await CameraRoll.save(imageUri, { type: "photo" });
      alert("Image saved to camera roll");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <RNCamera ref={cameraRef} style={{ flex: 1 }} />
      {imageUri && (
        <Filter>
          <FilterImage
            source={{ uri: imageUri }}
            filter={Filter.sepia(filterValue)}
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
          />
        </Filter>
      )}
      <TouchableOpacity onPress={takePicture}>
        <Text>Take Picture</Text>
      </TouchableOpacity>
      <Slider
        value={filterValue}
        onValueChange={handleSliderChange}
        minimumValue={0}
        maximumValue={10}
      />
      <TouchableOpacity onPress={saveImageToCameraRoll}>
        <Text>Save to Camera Roll</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterScreen;
