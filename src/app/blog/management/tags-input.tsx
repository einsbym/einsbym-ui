import React, { useState } from 'react';

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
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        {tag} <button onClick={() => removeTag(index)}>x</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Enter a tag and press Enter"
            />
        </div>
    );
};
