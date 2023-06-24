import webvtt
from pydub import AudioSegment
from pydub.playback import play

audio_path = "/content/vocals.wav"
vtt_path = "/content/vocals.vtt"

# Load the audio file
audio = AudioSegment.from_file(audio_path, format="wav")

# Load the VTT file
captions = webvtt.read(vtt_path)

def vtt_to_milliseconds(timestamp):
    time_parts = re.split(r'[:\.]', timestamp)
    hours, minutes, seconds, milliseconds = map(int, time_parts)
    total_milliseconds = (
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000 +
        milliseconds
    )
    return total_milliseconds
# Iterate over the captions and synchronize with the audio
for caption in captions:
    start_time = vtt_to_milliseconds(caption.start) 
    end_time = vtt_to_milliseconds(caption.end)
    caption_text = caption.text
    
    # Print the caption text
    print(caption_text)
    
    # Extract the corresponding segment from the audio
    audio_segment = audio[start_time:end_time]
    
    # Play the audio segment
    play(audio_segment)

# Done playing the audio and displaying subtitles
