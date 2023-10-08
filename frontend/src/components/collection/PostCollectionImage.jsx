import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostCollectionImageMutation } from "../../services/backend";
import Spinner from "../utility/Spinner";

const PostCollectionImage = () => {
    const { id } = useParams();
    const [postImage, postImageResult] = usePostCollectionImageMutation();
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageFormData = new FormData();
        imageFormData.append("image", image);
        setResponse(await postImage({ id, payload: imageFormData }));
    };

    useEffect(() => {
        if (postImageResult.isSuccess) {
            navigate("/collection/" + id);
        }
    }, [response]);

    return (
        <form
            className="flex flex-col max-w-[95%] md:max-w-xl m-auto mt-5"
            onSubmit={(event) => {
                handleSubmit(event);
            }}>
            <input
                onChange={(event) => {
                    setImage(event.target.files[0]);
                }}
                className="rounded-b-none"
                type="file"
                name="image"
                id=""
            />
            {!image ? "" : <img alt="not found" src={URL.createObjectURL(image)} />}

            <button disabled={postImageResult.isLoading} className="rounded-b-md form-button bg-primary">
                {postImageResult.isLoading ? <Spinner /> : "Submit"}
            </button>
            <div className="flex gap-2 text-text/90">
                <span className="material-symbols-outlined text-error">info</span> If the image doesn't update after submitting refresh the page
            </div>
        </form>
    );
};

export default PostCollectionImage;
