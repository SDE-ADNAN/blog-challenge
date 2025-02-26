"use client"


import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const SharePostBtn = () => {
    return (
        <Button
            onClick={() => toast("✅ Copied to clipboard! 🎉")}
            className="mt-4 transition-all px-6 rounded-[4px] py-2
                        dark:bg-[#FF4C29] dark:hover:bg-[#FF6A3D] dark:text-white
                        bg-[#1E88E5] hover:bg-[#1976D2] text-white"
        >
            Share Post
        </Button>
    )
}

export default SharePostBtn