import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface TagInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            e.preventDefault();
            setTags(tags.slice(0, tags.length - 1));
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div>
            {tags.length > 0 && (
                <div className="w-full grid gap-2 grid-cols-6 my-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="block relative bg-[#cc00ff3a] group-hover:bg-black text-[#cc00ff] p-1 px-2 rounded-lg text-center break-words"
                        >
                            {tag} <button className='absolute -top-2 -right-2' onClick={() => removeTag(index)}><IoCloseCircleOutline className='text-lg text-red-300' /></button>
                        </span>
                    ))}
                </div>
            )}
            <input
                id="tag-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Enter a tag and press Enter"
                className="p-5 w-full bg-gray-900 rounded-lg shadow-lg focus:outline-none placeholder:text-gray-600"
            />
        </div>
    );
};
