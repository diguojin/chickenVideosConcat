let cmd = require('node-cmd');
let fs = require('fs');
let crypto = require('crypto');

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

cmd.get('dir /b videos', function (err, data, stderr) {
    let unTrimArr = data.split("\n");
    let res = [];
    unTrimArr.forEach(function (videoTitle, index) {
        let title = videoTitle.trim();
        if(title){
            let md5Title = index + '_' + md5(title) + '.mp4';
            console.log(md5Title);
            fs.rename(`videos/${title}`, `videos/${md5Title}`, function (err) {
                if (err) {
                    console.log(title);
                    console.log(err + ' 视频文件重命名失败')
                }
            });
            res.push(`file '${md5Title}'`)
        }
    });
    let output = res.join('\n');
    fs.writeFile('video-list.txt', output, function (err) {
        if (err) throw err;
    });
});

cmd.run('concat.bat');
console.log('合并完成.');