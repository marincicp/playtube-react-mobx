import { IoIosThumbsUp } from "react-icons/io";

function CommentCard({ com }) {
  if (!com) return;

  const {
    snippet: {
      topLevelComment: {
        snippet: {
          authorDisplayName,
          authorProfileImageUrl,
          likeCount,
          textDisplay,
        },
      },
    },
  } = com;

  const comContent =
    textDisplay.length > 50 ? `${textDisplay}...` : textDisplay;

  return (
    <div className="w-full h-[150px] md:h-[100px] bg-custom-gray-dark/10 flex gap-4 rounded-lg px-6 py-2">
      <div className="w-fit h-full flex items-center justify-center p-2">
        {" "}
        <img
          className=" h-full rounded-full "
          src={authorProfileImageUrl}
          alt="comment"
        />
      </div>
      <div className="w-[70%] flex flex-col gap-1 p-2">
        <p className="font-bold text-lg">{authorDisplayName}</p>
        <p>"{comContent.slice(0, 100)}"</p>
        <p className="flex place-items-center gap-2">
          <span>{<IoIosThumbsUp />}</span> <span>{likeCount}</span>
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
