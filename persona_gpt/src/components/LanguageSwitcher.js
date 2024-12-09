import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
  }, [i18n.language]);

  return (
    <ButtonGroup 
      variant="outlined" 
      size="small"
      sx={{
        '& .MuiButton-root': {
          borderColor: 'text.secondary',  // 기본 테두리 색상을 더 연하게
          color: 'text.secondary',        // 기본 텍스트 색상을 더 연하게
          px: 2,
          py: 0.75,
          bgcolor: 'background.paper',
          fontWeight: 400,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'text.primary',
            color: 'text.primary',
            bgcolor: 'background.paper',
            opacity: 0.9
          }
        },
        '& .MuiButton-root.selected': {
          bgcolor: 'primary.main',      
          borderColor: 'primary.main',    
          color: 'common.white',          // 선택된 버튼 텍스트는 흰색으로
          fontWeight: 700,
          transform: 'scale(1)',
          '&:hover': {
            bgcolor: 'primary.dark',      // 호버 시 더 진한 색상
            borderColor: 'primary.dark',
            opacity: 1
          }
        }
      }}
    >
      <Button 
        className={i18n.language === 'ko' ? 'selected' : ''} 
        onClick={() => i18n.changeLanguage('ko')}
      >
        KO
      </Button>
      <Button 
        className={i18n.language === 'en' ? 'selected' : ''} 
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;