// image compression snippet from Ben Awad's video
// *********************
// modify/edit image here using buffer
const convertToJpg = async (input) => {
    if (isJpg(input)) {
      return input;
    }
    const buffer = sharp(input).jpeg().toBuffer();

    return buffer;
  };

  const miniBuffer = await imagemin.buffer(buffer, {
    plugins: [convertToJpg, mozjpeg({ quality: 85 })],
  });


// ***********************