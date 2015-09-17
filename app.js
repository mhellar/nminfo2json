var XML = require('pixl-xml');
var jsforce = require('jsforce');
var conn = new jsforce.Connection();
var exec = require('child_process').exec;
var checksum = 'mediainfo -f --Output=XML ';
var minfo = 'mediainfo -f --Output=XML ';
var fs = require("fs");


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
  console.log(doc.File.track[1].Bit_depth[1]);
  console.log(doc.File.track[1].Compression_mode[0]);
  console.log(doc.File.track[1].Color_space);
  console.log(doc.File.track[2].Channel_s_[1]);
  console.log(doc.File.track[2].Codec[1]);
  console.log(doc.File.track[2].Sampling_rate[1]);
  console.log(doc.File.track[2].Bit_rate[1]);

      conn.login('login', 'password', function(err, res) {
        if (err) {
            return console.error(err);
        }
        var barcode = process.argv[3];
        conn.sobject("Preservation_Object__c").upsert({
            ExternalID__c: barcode,
            Name: barcode,
            messageDigestAlgorithm__c: 'SHA-1',
            // messageDigest__c: sha256(process.argv[2]),
            Label_on_Original__c: 'test',
            instantiationIdentifierDigital__c: doc.File.track[0].File_name + "." + doc.File.track[0].File_extension,
            instantiationDigital__c: doc.File.track[0].File_extension,
            essenceTrackDuration__c: doc.File.track[0].Duration[5],
            essenceTrackEncodingVideo__c: doc.File.track[1].Codec_ID,
            instantiationDigitalColorSpace__c: doc.File.track[1].Color_space,
            essenceTrackAspectRatio__c: doc.File.track[1].Display_aspect_ratio[1],
            essenceTrackFrameSize__c: doc.File.track[1].Width[0] + "x" + doc.File.track[1].Height[0],
            essenceTrackFrameRate__c: doc.File.track[1].Frame_rate[1],
            essenceTrackCompressionMode__c: doc.File.track[1].Compression_mode[0],
            instantiationChannelConfigDigitalLayout__c: doc.File.track[2].Channel_s_[1],
            instantiationChannelConfigurationDigital__c: doc.File.track[2].Channel_s_[1],
            essenceTrackSamplingRate__c: doc.File.track[2].Sampling_rate[1],
            essenceTrackEncodingAudio__c: doc.File.track[2].Codec[1],
            instantiationFileSize__c: getFilesizeInBytes(process.argv[2]),
            instantiationDataRateVideo__c: doc.File.track[2].Bit_rate[1],
            essenceTrackBitDepthVideo__c: doc.File.track[1].Bit_depth[1],
            instantiationDigitalChromaSubsampling__c: doc.File.track[1].Chroma_subsampling,
            instantiationDataRateAudio__c: doc.File.track[2].Bit_rate[1]
        }, 'ExternalID__c', function(err, ret) {
            if (err || !ret.success) {
                return console.error(err, ret);
            }
            console.log('Updated Successfully');
            // ...
        });
    });
 });

function frameRateCalc(val) {
    var rate = math.eval(val);
    return rate;
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    var fileSizeInMegabytes = fileSizeInBytes / 1000000.0
    return fileSizeInMegabytes + " MB"
}