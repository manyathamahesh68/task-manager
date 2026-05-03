# Task Manager - Student Assignment Tracker

A beautiful, modern web application designed to help students track their assignments and never miss a deadline again.

## ✨ Features

### Core Features
- ✅ **Add Tasks** - Create new assignments with titles and deadlines
- ✅ **Display Tasks** - View all tasks in an organized, beautiful list
- ✅ **Mark as Completed** - Checkbox to mark assignments as done
- ✅ **Delete Tasks** - Remove unwanted assignments

### Bonus Features
- 🔴 **Overdue Highlighting** - Automatically highlights overdue assignments in red
- 🟢 **Task Separation** - Filter between Pending, Completed, and Overdue tasks
- 📅 **Smart Sorting** - Sort by deadline (earliest/latest), title (A-Z), or date added
- 📊 **Live Statistics** - Real-time counters for pending, completed, and overdue tasks
- 💾 **Local Storage** - Your tasks are saved automatically in your browser
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **Mobile Friendly** - Works perfectly on all devices

## 🚀 Quick Start

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No installation required!

2. **Add Your First Task**
   - Enter assignment name in the "Task Title" field
   - Select a deadline using the date picker
   - Click "Add Task"

3. **Manage Your Tasks**
   - Click the checkbox to mark tasks as completed
   - Use filter buttons to view specific task types
   - Sort tasks using the dropdown menu
   - Click the trash icon to delete tasks

## 🎯 How to Use

### Adding Tasks
1. Type your assignment name in the "Task Title" field
2. Click the date picker and select your deadline
3. Click "Add Task" to save it

### Viewing Tasks
- **All Tasks**: Shows every assignment
- **Pending**: Only incomplete, non-overdue tasks
- **Completed**: Tasks you've marked as done
- **Overdue**: Tasks past their deadline

### Sorting Options
- **Deadline (Earliest First)**: See what's due soonest
- **Deadline (Latest First)**: See what's due farthest away
- **Title (A-Z)**: Alphabetical order
- **Title (Z-A)**: Reverse alphabetical
- **Date Added**: Most recently added first

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks required
- **Font Awesome** - Beautiful icons
- **Google Fonts** - Inter font family

### Browser Compatibility
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Storage
- Tasks are stored in your browser's Local Storage
- No data is sent to external servers
- Clear your browser data to reset the app

## 📱 Responsive Design

The Task Manager is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Design Features

- **Gradient backgrounds** with glassmorphism effects
- **Smooth animations** and micro-interactions
- **Color-coded status indicators**
- **Hover effects** on interactive elements
- **Toast notifications** for user feedback
- **Empty states** with helpful messages

## 🔧 Customization

The app uses CSS variables for easy theming. You can customize colors by modifying the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    /* ... and more */
}
```

## 📄 File Structure

```
studtask/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and animations
├── script.js       # All JavaScript functionality
└── README.md       # This documentation
```

## 🌟 Sample Data

The app includes 3 sample tasks on first load to demonstrate features:
- Math Assignment (due in 2 days)
- Physics Lab Report (due in 5 days)  
- Chemistry Quiz (overdue - for demonstration)

These samples help you understand how overdue highlighting and filtering work.

## 💡 Tips for Students

1. **Add assignments immediately** when you receive them
2. **Check "Overdue" filter** regularly to catch missed deadlines
3. **Sort by "Deadline (Earliest First)"** to prioritize upcoming work
4. **Mark tasks complete** as soon as you finish them
5. **Review "Pending" tasks** each morning to plan your day

## 🔒 Privacy & Security

- All data stays on your device
- No tracking or analytics
- No internet connection required after loading
- Completely offline capable

---

Made with ❤️ for students who want to stay organized and never miss an assignment deadline again!
