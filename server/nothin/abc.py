import subprocess

audio_path = input("Enter the path to the audio file: ")
model_name = input("Enter the model name (e.g., 'tiny'): ")

# Construct the command
command = f"whisper {audio_path} --model {model_name}"

# Run the command using subprocess
process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
output, error = process.communicate()

# Print the output and error messages
print("Output:", output.decode())
print("Error:", error.decode())

# Generate text file
text_file_path = "outputtxt.txt"
with open(text_file_path, "w") as text_file:
    text_file.write(output.decode())
print("Text file generated:", text_file_path)

# Generate SRT file
srt_file_path = "outputsrt.srt"
with open(srt_file_path, "w") as srt_file:
    srt_file.write(output.decode())
print("SRT file generated:", srt_file_path)

# Generate VTT file
vtt_file_path = "outputvtt.vtt"
with open(vtt_file_path, "w") as vtt_file:
    vtt_file.write("WEBVTT\n\n")
    vtt_file.write(output.decode())
print("VTT file generated:", vtt_file_path)
