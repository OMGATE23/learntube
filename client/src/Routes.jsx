import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./layouts/Main";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import PlaylistView from "./pages/PlaylistView";
import EnrolledPlaylist from "./pages/EnrolledPlaylist";
import PlaylistWatch from "./pages/PlaylistWatch";
import LandingPage from "./pages/LandingPage";
import Onboarding from "./pages/Onboarding";
import Leaderboard from './pages/Leaderboard';

const NavRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlistview/:id" element={<PlaylistView />} />
        <Route path="/enrolledplaylist" element={<EnrolledPlaylist />} />
        <Route path="/playlistwatch/:id" element={<PlaylistWatch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default NavRoutes