import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  useUpdateLessonProgressMutation,
  useCompleteSubjectCurriculumMutation,
} from "@/store/api/subjectsApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentLessonId, setNextLessonId } from "@/store/slice/subjectSlice";

interface VideoPlayerProps {
  videoUrl: string;
  lessonId: string;
  nextLessonId?: string;
}

export const VideoPlayer = forwardRef<
  HTMLVideoElement,
  VideoPlayerProps
>(({ videoUrl, lessonId, nextLessonId }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const internalVideoRef = useRef<HTMLVideoElement | null>(null);
  const isCompletedRef = useRef(false);
  useImperativeHandle(ref, () => internalVideoRef.current!);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoState, setVideoState] =
    useState<"ready" | "playing" | "ended" | "loading">("ready");
  const [updateLessonProgress] = useUpdateLessonProgressMutation();
  const [completeSubjectCurriculum] = useCompleteSubjectCurriculumMutation();


  const togglePlay = async () => {
    if (!internalVideoRef.current) return;
    if (isPlaying) {
      internalVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      await internalVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!internalVideoRef.current) return;
    const current = internalVideoRef.current.currentTime;
    const total = internalVideoRef.current.duration;

    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100 || 0);
  };

  const handleVideoEnded = async () => {
    setIsPlaying(false);
    setVideoState("ended");

    if (isCompletedRef.current) return;
    isCompletedRef.current = true;

    try {
      await updateLessonProgress({
        lessonId,
        data: {
          secondsWatched: Math.floor(duration),
          durationWatchedIncrement: Math.floor(duration),
        },
      }).unwrap();

      setVideoState("loading");

      const completeResponse = await completeSubjectCurriculum(lessonId).unwrap();
      const nextId = completeResponse?.data?.nextLessonId;

      if (nextId) {
        dispatch(setCurrentLessonId(nextId));
        dispatch(setNextLessonId(nextId));

        navigate(`/dashboard/video-learning?lessonId=${nextId}`);
      }
    } catch (error) {
      console.error(error);
      setVideoState("ready");
    }
  };

  const handleNext = async () => {
    if (!nextLessonId) return;

    try {
      localStorage.setItem("lessonId", nextLessonId);
      dispatch(setCurrentLessonId(nextLessonId));
      dispatch(setNextLessonId(nextLessonId)
      );

      navigate(
        `/dashboard/video-learning?lessonId=${nextLessonId}`,
        {
          replace: true,
        }
      );
    } finally {
    }
  };

  const handleProgressChange = (
    value: number[]
  ) => {
    if (!internalVideoRef.current) return;
    const newProgress = value[0];
    setProgress(newProgress);

    internalVideoRef.current.currentTime =
      (newProgress / 100) *
      internalVideoRef.current.duration;
  };

  const formatTime = (time: number) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const video = internalVideoRef.current;
    if (!video) return;
    const tryAutoplay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked");
        setIsPlaying(false);
      }
    };

    tryAutoplay();
  }, [videoUrl]);

  useEffect(() => {
    setVideoState("ready");
    setIsPlaying(false);
    isCompletedRef.current = false;
  }, [videoUrl]);

  return (
    <div className="custom-surface rounded-2xl overflow-hidden shadow-2xl">

      <div className="aspect-video relative bg-black group">

        {isPlaying && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              PLAYING
            </div>
          </div>
        )}

        <video
          ref={internalVideoRef}
          src={videoUrl}
          onClick={togglePlay}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onPlay={() => {
            setIsPlaying(true);
            setVideoState("playing");
          }}
          onPause={() => {
            setIsPlaying(false);
          }}

          onEnded={handleVideoEnded}
        />
        {videoState === "ready" && !isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Play className="w-10 h-10 text-white" />
          </button>
        )}

        {videoState === "ended" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Pause className="w-10 h-10 text-white opacity-80" />
          </div>
        )}
        {videoState === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="w-14 h-14 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute bottom-3 right-3 text-white text-xs bg-black/60 px-2 py-1 rounded">
          {formatTime(currentTime)} /{" "}
          {formatTime(duration)}
        </div>
      </div>

      <div className="p-4">

        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={
            handleProgressChange
          }
          className=" mb-5 cursor-pointer [&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400 [&_[data-orientation=horizontal]]:h-1.5 "
        />

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause />
              ) : (
                <Play />
              )}
            </button>

            <SkipBack />

            <SkipForward
              onClick={handleNext}
              className={`w-5 h-5 ${nextLessonId
                ? "cursor-pointer hover:text-primary"
                : "opacity-40 cursor-not-allowed"
                }`}
            />

            <Volume2 />
          </div>

          <Maximize />
        </div>
      </div>
    </div>
  );
});