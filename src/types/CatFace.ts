export type CatFace =
    {
        str: CatFaceEmotion,
        emoji: CatFaceEmoji
    }

type CatFaceEmoji = "😹" | "😾" | "😿" | "😸" | "😼" | "😻" | "🙀";
type CatFaceEmotion = "joy" | "angry" | "sad" | "happy" | "smug" | "love" | "shock"
