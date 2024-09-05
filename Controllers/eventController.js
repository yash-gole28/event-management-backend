import eventSchema from "../Models/eventSchema.js";


export const AddEvent = async (req , res) => {
    try{
        const {
            title,
            description,
            images,
            date,
            time,
            location,
            ticketPrice,
            peopleLimit,
            organizer,
            category,
            status,
            freeTickets
        } = req.body;

        const newEvent = new eventSchema({
            title,
            description,
            images,
            date,
            time,
            location,
            ticketPrice,
            peopleLimit,
            organizer,
            category,
            status,
            freeTickets
        });

        const savedEvent = await newEvent.save();

        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: savedEvent
        });
    }catch(error){
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }
        console.error('Registration error:', error); // Log error server-side
        return res.status(500).json({ success: false, message: 'registration error' });
    }
}

export const UpdateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            images,
            date,
            time,
            location,
            ticketPrice,
            peopleLimit,
            organizer,
            category,
            status,
            freeTickets
        } = req.body;

        // Find the event by ID and update it
        const updatedEvent = await eventSchema.findByIdAndUpdate(
            id,
            {
                title,
                description,
                images,
                date,
                time,
                location,
                ticketPrice,
                peopleLimit,
                organizer,
                category,
                status,
                freeTickets
            },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Respond with the updated event
        return res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: updatedEvent
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                details: error.message
            });
        }
        console.error('Update event error:', error); // Log error server-side
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


export const DeleteEvent = async (req, res) => {
    try {
        const { id } = req.params; // Event ID from the request parameters

        // Find and delete the event by ID
        const deletedEvent = await eventSchema.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Respond with a success message
        return res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
            data: deletedEvent
        });
    } catch (error) {
        console.error('Delete event error:', error); // Log error server-side
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};