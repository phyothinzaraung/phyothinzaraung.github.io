export type LearningStatus = 'Learning' | 'In Progress' | 'Completed' | 'Planned'

type RoadmapTrack = {
  id: 'ros' | 'languages' | 'math'
  title: string
  description: string
  topics: string[]
}

export const roboticsRoadmap: RoadmapTrack[] = [
  {
    id: 'ros',
    title: 'ROS 2 roadmap',
    description: 'Start with the ROS 2 command line and a local workspace, then build packages and connect nodes in Python and C++.',
    topics: ['Nodes and topics', 'Services and actions', 'Launch and parameters', 'tf2 and rosbag'],
  },
  {
    id: 'languages',
    title: 'Python and C++ foundations',
    description: 'Practice Python scripting and testing, then build small C++ programs that reinforce types, ownership, and build tools.',
    topics: ['Python', 'C++', 'Unit testing', 'CMake'],
  },
  {
    id: 'math',
    title: 'Linear algebra and robotics mathematics',
    description: 'Use vectors, matrices, and rigid transforms to represent a robot’s pose and express it in different coordinate frames.',
    topics: ['Linear algebra', 'Rotations', 'Coordinate frames', 'Introductory kinematics'],
  },
]
