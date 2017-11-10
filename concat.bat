cd videos
set datevar=%date:~0,4%%date:~5,2%%date:~8,2%
set hour=%time:~0,2%
set minSec=%timevar%%time:~3,2%%time:~6,2%

ffmpeg -f concat -i ..\video-list.txt -c copy output%datevar%%hour%%minSec%.mp4