; ==========================================================
; MOUSE AUTOMATION: PRINT & PASTE (FIXED)
; ==========================================================
; 1. Middle-Click (Wheel Button) = Print Screen
; 2. Hold Right-Click + Scroll Down = Paste (Ctrl+V)
; ==========================================================

; Middle click to Print Screen
MButton::Send("{PrintScreen}")

; Right-Click + Scroll Down to Paste
RButton & WheelDown::Send("^v")

; Required to keep normal Right-Click working
RButton::Click "Right"
