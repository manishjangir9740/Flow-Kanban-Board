import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBoardStore } from '../store/boardStore';
import { KanbanColumn } from './Column';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import type { Column } from '../types';

const columns: Column[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

export const KanbanBoard = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tasks = useBoardStore((state) => state.tasks);
  const { moveTask } = useBoardStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // minimum drag distance before triggering
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    // Check if over a column dropzone
    const overColumn = columns.find((c) => c.id === overId);
    
    if (overColumn) {
    const activeTask = tasks[activeTaskId];
    if (activeTask && activeTask.status !== overColumn.id) {
      moveTask(activeTaskId, overColumn.id);
    }
    }
  };

  const activeTask = activeId ? tasks[activeId] : null;

  const tasksArray = Object.values(tasks);

  return (
    <div className="h-[calc(100vh-8rem)] flex overflow-x-auto pb-4 custom-scrollbar">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-full px-4 md:px-0 justify-center min-w-full">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksArray.filter((t) => t.status === column.id)}
              onAddTask={() => setIsModalOpen(true)}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{
          duration: 500,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
