USE [master]
GO

/****** Object:  Database [tagme]    Script Date: 29/12/2021 16:40:11 ******/
CREATE DATABASE [tagme]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'tagme', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\tagme.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'tagme_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\tagme_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [tagme].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [tagme] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [tagme] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [tagme] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [tagme] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [tagme] SET ARITHABORT OFF 
GO

ALTER DATABASE [tagme] SET AUTO_CLOSE ON 
GO

ALTER DATABASE [tagme] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [tagme] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [tagme] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [tagme] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [tagme] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [tagme] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [tagme] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [tagme] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [tagme] SET  ENABLE_BROKER 
GO

ALTER DATABASE [tagme] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [tagme] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [tagme] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [tagme] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [tagme] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [tagme] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [tagme] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [tagme] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [tagme] SET  MULTI_USER 
GO

ALTER DATABASE [tagme] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [tagme] SET DB_CHAINING OFF 
GO

ALTER DATABASE [tagme] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [tagme] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [tagme] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [tagme] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [tagme] SET QUERY_STORE = OFF
GO

ALTER DATABASE [tagme] SET  READ_WRITE 
GO

