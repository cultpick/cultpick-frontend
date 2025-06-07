"use client";

import styles from "./page.module.css";
import Image from "next/image";
import PickList from "@/components/PickList/PickList";
import { useState } from "react";
import Button from "@/components/Button";
import { usePickListQuery, useDeletePickListMutation } from "@/api/pick/query";

export default function PickListPage() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Fetch pick list data
  const { data, isLoading } = usePickListQuery();

  // Delete mutation
  const deleteMutation = useDeletePickListMutation();

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedItems([]);
  };

  // Delete selected items
  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      deleteMutation.mutate(selectedItems.map(id => id.toString()));
      setSelectedItems([]);
    }
  };

  // Delete all expired performances
  const handleDeleteExpired = () => {
    const today = new Date();
    const expiredPerformances = data?.performanceList
      .filter(performance => new Date(performance.endDate) < today)
      .map(performance => performance.id.toString());
    
    if (expiredPerformances && expiredPerformances.length > 0) {
      deleteMutation.mutate(expiredPerformances);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Image
            src={"/img/typography_logo.png"}
            alt="cultpick logo"
            width={200}
            height={48}
          />
        </div>
        <div className="pixel_text_20">My Pick List</div>
        <div className={styles.editButton}>
          <Button
            text={isEditMode ? "편집 완료" : "목록 편집"}
            onClick={toggleEditMode}
            state="active"
            width="12rem"
            height="4rem"
          />
        </div>
      </div>

      {isEditMode && (
        <div className={styles.deleteButtons}>
          <Button 
            text="종료 공연 전체 삭제" 
            onClick={handleDeleteExpired} 
            state="active"
            width="20rem"
            height="4rem"
          />
          <Button 
            text="선택 항목 삭제" 
            onClick={handleDeleteSelected} 
            state={selectedItems.length === 0 ? "disabled" : "active"}
            width="20rem"
            height="4rem"
          />
        </div>
      )}

      <PickList 
        isEditMode={isEditMode} 
        data={data} 
        isLoading={isLoading} 
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}