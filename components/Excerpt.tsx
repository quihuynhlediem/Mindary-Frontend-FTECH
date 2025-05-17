import React, { FC, useState } from "react";

interface Props {
    text: string;
}

const Excerpt: FC<Props> = ({ text }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isLongEnough = text.length >= 200;

    let briefText;
    if (isLongEnough) {
        briefText = text.slice(0, 100);
    }

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return isLongEnough ? (
        !isOpen ? (
            <p>
                {briefText}{" "}
                <span
                    className="cursor-pointer text-muted-foreground"
                    onClick={handleOpen}
                >
                    more...
                </span>{" "}
            </p>
        ) : (
            <p>
                {text}{" "}
                <span
                    className="cursor-pointer text-muted-foreground"
                    onClick={handleOpen}
                >
                    less
                </span>
            </p>
        )
    ) : (
        <p>{text}</p>
    );
};

export default Excerpt;