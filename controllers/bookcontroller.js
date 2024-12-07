import Book from "../models/Book.js";

// Controller to handle search functionality
export const searchBooks = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        // Build a case-insensitive search query
        const regex = new RegExp(query, "i");

        // Search books by title, author, category, and description
        const books = await Book.find({
            $or: [
                { title: { $regex: regex } },
                { author: { $regex: regex } },
                { category: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        });

        // Prioritize by title > author > category > description
        books.sort((a, b) => {
            // Priority for title, author, category, description
            if (a.title.match(regex)) return -1;
            if (b.title.match(regex)) return 1;
            if (a.author.match(regex)) return -1;
            if (b.author.match(regex)) return 1;
            if (a.category.match(regex)) return -1;
            if (b.category.match(regex)) return 1;
            return 0;
        });

        return res.status(200).json(books);
    } catch (error) {
        console.error("Error searching books", error);
        return res.status(500).json({ message: "Error searching books" });
    }
};

export const createBook = async (req, res) => {
    const { title, author, publishedYear, genre, price, category, description } = req.body;

    if (!title || !author || !publishedYear || !genre || !price || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Create a new book
        const newBook = new Book({
            title,
            author,
            publishedYear,
            genre,
            price,
            category,
            description,
        });

        // Save the book to the database
        await newBook.save();

        return res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error("Error creating book", error);
        return res.status(500).json({ message: "Error creating book" });
    }
};