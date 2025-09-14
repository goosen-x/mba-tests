import { CareerPosition, CareerTrack, careerPaths } from './career-paths';

// Функция для поиска кратчайшего пути между двумя позициями
export function findCareerPath(fromId: string, toId: string): CareerPosition[] | null {
  const visited = new Set<string>();
  const queue: { position: CareerPosition; path: CareerPosition[] }[] = [];
  
  // Найти начальную позицию
  const startPosition = careerPaths
    .flatMap(path => path.positions)
    .find(pos => pos.id === fromId);
    
  if (!startPosition) return null;
  
  queue.push({ position: startPosition, path: [startPosition] });
  visited.add(fromId);
  
  while (queue.length > 0) {
    const { position, path } = queue.shift()!;
    
    if (position.id === toId) {
      return path;
    }
    
    for (const nextId of position.nextPositions) {
      if (!visited.has(nextId)) {
        visited.add(nextId);
        const nextPosition = careerPaths
          .flatMap(p => p.positions)
          .find(pos => pos.id === nextId);
          
        if (nextPosition) {
          queue.push({ position: nextPosition, path: [...path, nextPosition] });
        }
      }
    }
  }
  
  return null;
}

// Функция для расчета примерного времени карьерного пути
export function calculatePathDuration(path: CareerPosition[]): number {
  if (path.length < 2) return 0;
  
  let totalYears = 0;
  for (let i = 1; i < path.length; i++) {
    const prevPos = path[i - 1];
    const currPos = path[i];
    // Берем минимальную разницу в опыте
    totalYears += Math.max(currPos.yearsExperience.min - prevPos.yearsExperience.max, 1);
  }
  
  return totalYears;
}

// Функция для получения всех доступных позиций начального уровня
export function getEntryLevelPositions(): CareerPosition[] {
  return careerPaths
    .flatMap(path => path.positions)
    .filter(pos => pos.level === 'entry' || pos.level === 'junior')
    .filter(pos => pos.yearsExperience.min === 0);
}

// Функция для получения топовых позиций (C-level)
export function getCLevelPositions(): CareerPosition[] {
  return careerPaths
    .flatMap(path => path.positions)
    .filter(pos => pos.level === 'c-level');
}

// Функция для поиска позиций по навыкам
export function findPositionsBySkills(skills: string[]): CareerPosition[] {
  return careerPaths
    .flatMap(path => path.positions)
    .filter(pos => 
      skills.some(skill => 
        pos.skills.some(posSkill => 
          posSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
}

// Функция для получения среднего диапазона зарплат по треку
export function getAverageSalaryByTrack(track: CareerTrack): { min: number; max: number } {
  const positions = careerPaths
    .find(path => path.track === track)
    ?.positions || [];
    
  if (positions.length === 0) return { min: 0, max: 0 };
  
  const totalMin = positions.reduce((sum, pos) => sum + pos.salary.min, 0);
  const totalMax = positions.reduce((sum, pos) => sum + pos.salary.max, 0);
  
  return {
    min: Math.round(totalMin / positions.length),
    max: Math.round(totalMax / positions.length)
  };
}

// Функция для получения рекомендаций по переходу между треками
export function getTrackTransitionRecommendations(
  currentPositionId: string
): { track: CareerTrack; positions: CareerPosition[] }[] {
  const currentPosition = careerPaths
    .flatMap(path => path.positions)
    .find(pos => pos.id === currentPositionId);
    
  if (!currentPosition) return [];
  
  const recommendations: { track: CareerTrack; positions: CareerPosition[] }[] = [];
  
  // Ищем позиции в других треках с похожим уровнем опыта
  careerPaths.forEach(path => {
    if (path.track !== currentPosition.track) {
      const similarPositions = path.positions.filter(pos => {
        const expOverlap = 
          pos.yearsExperience.min <= currentPosition.yearsExperience.max &&
          pos.yearsExperience.max >= currentPosition.yearsExperience.min;
          
        // Проверяем пересечение навыков
        const skillOverlap = pos.skills.some(skill =>
          currentPosition.skills.some(currSkill =>
            skill.toLowerCase().includes(currSkill.toLowerCase()) ||
            currSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        
        return expOverlap && skillOverlap;
      });
      
      if (similarPositions.length > 0) {
        recommendations.push({
          track: path.track,
          positions: similarPositions
        });
      }
    }
  });
  
  return recommendations;
}

// Функция для расчета карьерного прогресса
export function calculateCareerProgress(
  currentPositionId: string,
  targetPositionId: string
): number {
  const path = findCareerPath(currentPositionId, targetPositionId);
  if (!path || path.length < 2) return 0;
  
  const currentIndex = path.findIndex(pos => pos.id === currentPositionId);
  const totalSteps = path.length - 1;
  
  return Math.round((currentIndex / totalSteps) * 100);
}