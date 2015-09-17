var XML = require('pixl-xml');
var exec = require('child_process').exec;
var checksum = 'mediainfo -f --Output=XML ';
var minfo = 'mediainfo -f --Output=XML ';


exec(minfo + process.argv[2], function(error, stdout, stderr) {
  var doc = XML.parse(stdout);
  console.log(doc.File.track[0].File_name + "." + doc.File.track[0].File_extension);
  console.log(doc.File.track[0].File_last_modification_date);
  console.log(doc.File.track[0].Writing_application[1]);
  console.log(doc.File.track[0].File_extension);
  console.log(doc.File.track[0].Frame_count);
  console.log(doc.File.track[0].Folder_name);
  console.log(doc.File.track[0].Duration[5]);
  console.log(doc.File.track[0].Overall_bit_rate[1]);
  console.log(doc.File.track[1].Codec_ID);
  console.log(doc.File.track[1].Color_space); 
  console.log(doc.File.track[1].Chroma_subsampling);
  console.log(doc.File.track[1].Width[0] + "x" + doc.File.track[1].Height[0]);
  console.log(doc.File.track[1].Display_aspect_ratio[1]);
  console.log(doc.File.track[1].Frame_rate[1]);
  console.log(doc.File.track[1].Compression_mode[0]);
  console.log(doc.File.track[1].Color_space);
  console.log(doc.File.track[2].Channel_s_[1]);
  console.log(doc.File.track[2].Codec[1]);
  console.log(doc.File.track[2].Sampling_rate[1]);
  console.log(doc.File.track[2].Bit_rate[1]);
 });