'use client';

import { motion } from 'framer-motion';
import { 
  Map, 
  TrendingUp,
  Users,
  Briefcase,
  Home
} from 'lucide-react';
import Link from 'next/link';
import GraphRoadmap from '@/components/roadmap/GraphRoadmap';

export default function CareerRoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <Home className="w-4 h-4 mr-2" />
          <span>Главная</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
            <Map className="w-10 h-10 text-indigo-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Карьерный роадмэп
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Визуализируйте свой путь от начинающего специалиста до топ-менеджера
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="text-2xl font-bold text-indigo-600">6</div>
              <div className="text-sm text-gray-600">Карьерных треков</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="text-2xl font-bold text-purple-600">30+</div>
              <div className="text-sm text-gray-600">Позиций</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="text-2xl font-bold text-pink-600">22</div>
              <div className="text-sm text-gray-600">MBA программы</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="text-2xl font-bold text-orange-600">5-20</div>
              <div className="text-sm text-gray-600">Лет опыта</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main Content - Simple Roadmap */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GraphRoadmap showBackButton={false} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как работает карьерный роадмэп
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите трек</h3>
              <p className="text-gray-600">
                6 карьерных направлений: от финансов до предпринимательства
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Изучите путь</h3>
              <p className="text-gray-600">
                Посмотрите требования, зарплаты и переходы между позициями
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите MBA</h3>
              <p className="text-gray-600">
                Получите рекомендации программ для вашей карьерной цели
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}