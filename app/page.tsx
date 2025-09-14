"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChartBar,
  Heart,
  Sparkles,
  Smartphone,
  ArrowRight,
  Brain,
  Target,
  Clock,
  GraduationCap,
  Map,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Three Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Test 1 - Competencies */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ChartBar className="h-10 w-10 text-blue-600" />
                  </div>
                  <Badge className="mb-4" variant="outline">
                    Тест #1
                  </Badge>
                  <CardTitle className="text-2xl mb-3">
                    Карта компетенций руководителя
                  </CardTitle>
                  <CardDescription className="text-base">
                    Оцените свои управленческие навыки по 6 ключевым
                    направлениям
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">12 интерактивных вопросов</span>
                    </div>
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">Drag & Drop формат</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">5 минут на прохождение</span>
                    </div>
                    <div className="flex items-center">
                      <ChartBar className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">Визуализация Spider Chart</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="lg"
                  >
                    <Link href="/test">
                      Пройти тест компетенций
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Test 2 - MBA Finder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group relative">
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                    NEW
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Heart className="h-10 w-10 text-purple-600" />
                  </div>
                  <Badge className="mb-4" variant="outline">
                    Тест #2
                  </Badge>
                  <CardTitle className="text-2xl mb-3">
                    Найди свой MBA
                  </CardTitle>
                  <CardDescription className="text-base">
                    Tinder для образования - свайпайте и находите идеальную
                    программу
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">Свайп-механика</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">22 MBA программы</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">Персональный подбор</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">Топ-3 рекомендации</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    size="lg"
                  >
                    <Link href="/mba-finder">
                      Найти свою программу
                      <Heart className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group relative">
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
                    HOT
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Map className="h-10 w-10 text-indigo-600" />
                  </div>
                  <Badge className="mb-4" variant="outline">
                    Карьерный путь
                  </Badge>
                  <CardTitle className="text-2xl mb-3">
                    Роадмэп карьеры
                  </CardTitle>
                  <CardDescription className="text-base">
                    Визуализируйте путь от junior до C-level в 6 направлениях
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">6 карьерных треков</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">30+ позиций</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">MBA рекомендации</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">Интерактивная карта</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                    size="lg"
                  >
                    <Link href="/career-roadmap">
                      Построить карьеру
                      <Map className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}