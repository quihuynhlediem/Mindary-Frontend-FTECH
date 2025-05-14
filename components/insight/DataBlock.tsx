'use client'
import React from "react";

interface DataBlockProps {
  emoji: string | "",
  data: number | 0,
  field: string | ""
}

const DataBlock: React.FC<DataBlockProps> = ({ emoji, data, field }) => {
  return (
    <div className="p-3 w-[33%] bg-white rounded-lg inline-flex flex-col justify-start items-center gap-1">
      <div className="w-24 inline-flex justify-start items-center">
        <div className="text-center text-black text-2xl font-bold leading-loose">{`${emoji} ${data}`}</div>
      </div>
      <div className="w-24 justify-center text-[#616161] text-xs font-normal leading-tight tracking-tight">{field}</div>
    </div>
  );
}

export default DataBlock;