'use client'

import AddReviewModal from '@/components/modal-review/AddReviewModal';
import ReviewProvider from '@/provider/usereviewmodals';
import Button from '@/components/common/Button';
import { useState } from 'react';

function Test() {
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const handleReviewClick = () => {
        setIsReviewOpen(!isReviewOpen);
    };

    return (
        <ReviewProvider>
            <main className="grid grid-cols-3 gap-8 bg-white p-8">
                <Button
                    type="button"
                    size="large"
                    color="secondary"
                    onClick={handleReviewClick}
                >
                    리뷰모달열기
                </Button>
                <AddReviewModal isOpen={isReviewOpen} onClick={handleReviewClick} />
            </main>
        </ReviewProvider>
    );
}

export default Test;